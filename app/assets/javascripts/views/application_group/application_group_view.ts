import { ApplicationGroup } from '@/ui_models/application_group';
import { WebDirective } from '@/types';
import template from './application-group-view.pug';
import { WebApplication } from '@/ui_models/application';

class ApplicationGroupViewCtrl {

  private $timeout: ng.ITimeoutService
  private applicationGroup: ApplicationGroup
  applications!: WebApplication[]
  activeApplication!: WebApplication

  /* @ngInject */
  constructor(
    $timeout: ng.ITimeoutService,
    mainApplicationGroup: ApplicationGroup
    ) {
    this.$timeout = $timeout;
    this.applicationGroup = mainApplicationGroup;
    this.applicationGroup.addApplicationChangeObserver(() => {
      this.reload();
    });
    this.applicationGroup.initialize();
  }

  reload() {
    this.$timeout(() => {
      this.activeApplication = this.applicationGroup.primaryApplication as WebApplication;
      this.applications = this.applicationGroup.getApplications() as WebApplication[];
    });
  }
}

export class ApplicationGroupView extends WebDirective {
  constructor() {
    super();
    this.template = template;
    this.controller = ApplicationGroupViewCtrl;
    this.replace = false;
    this.controllerAs = 'self';
    this.bindToController = true;
  }
}
