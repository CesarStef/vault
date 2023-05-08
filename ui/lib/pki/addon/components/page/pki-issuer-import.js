/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class PagePkiIssuerImportComponent extends Component {
  @tracked title = 'Import a CA';
}
