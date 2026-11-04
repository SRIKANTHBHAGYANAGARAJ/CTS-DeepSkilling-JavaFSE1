import { CanDeactivateFn } from '@angular/router';

export interface ComponentCanDeactivate {
  canDeactivate: () => boolean;
}

export const unsavedChangesGuard: CanDeactivateFn<ComponentCanDeactivate> = (component) => {
  if (component && typeof component.canDeactivate === 'function') {
    if (!component.canDeactivate()) {
      return window.confirm('You have unsaved changes. Leave?');
    }
  }
  return true;
};
