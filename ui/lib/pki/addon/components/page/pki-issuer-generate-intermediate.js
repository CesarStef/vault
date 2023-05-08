/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class PagePkiIssuerGenerateIntermediateComponent extends Component {
  @tracked title = 'Generate intermediate CSR';
}
