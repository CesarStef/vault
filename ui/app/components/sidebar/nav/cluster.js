/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class SidebarNavClusterComponent extends Component {
  @service currentCluster;
  @service version;
  @service auth;

  get cluster() {
    return this.currentCluster.cluster;
  }
}
