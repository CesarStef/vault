/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { waitFor } from '@ember/test-waiters';
import { tracked } from '@glimmer/tracking';
import { task } from 'ember-concurrency';
import errorMessage from 'vault/utils/error-message';
// TYPES
import PkiCertificateSignIntermediate from 'vault/models/pki/certificate/sign-intermediate';
import FlashMessageService from 'vault/services/flash-messages';
import { ValidationMap } from 'vault/vault/app-types';

interface Args {
  onCancel: CallableFunction;
  model: PkiCertificateSignIntermediate;
}

export default class PkiSignIntermediateFormComponent extends Component<Args> {
  @service declare readonly flashMessages: FlashMessageService;
  @tracked errorBanner = '';
  @tracked inlineFormAlert = '';
  @tracked modelValidations: ValidationMap | null = null;

  @action cancel() {
    this.args.model.unloadRecord();
    this.args.onCancel();
  }
  @task
  @waitFor
  *save(event: Event) {
    event.preventDefault();
    const { isValid, state, invalidFormMessage } = this.args.model.validate();
    this.modelValidations = isValid ? null : state;
    this.inlineFormAlert = invalidFormMessage;
    if (!isValid) return;
    try {
      yield this.args.model.save();
      this.flashMessages.success('Successfully signed CSR.');
    } catch (e) {
      this.errorBanner = errorMessage(e);
      this.inlineFormAlert = 'There was a problem signing the CSR.';
    }
  }

  get groups() {
    return {
      'Signing options': ['usePss', 'skid', 'signatureBits'],
      'Subject Alternative Name (SAN) Options': ['altNames', 'ipSans', 'uriSans', 'otherSans'],
      'Additional subject fields': [
        'ou',
        'organization',
        'country',
        'locality',
        'province',
        'streetAddress',
        'postalCode',
        'subjectSerialNumber', // this is different from the UUID serial number generated by vault (in show fields below)
      ],
    };
  }

  get showFields() {
    return ['serialNumber', 'certificate', 'issuingCa', 'caChain'];
  }
}
