import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { SpinnerComponent } from '@components/spinner/spinner.component';

@Directive({
  standalone: true,
  selector: '[appSpinner]',
})
export class SpinnerDirective {
  @Input() set appSpinner(isLoading: boolean | undefined) {
    const showSpinner: boolean = Boolean(isLoading);
    this.renderView(showSpinner);
  }

  constructor(private templateRef: TemplateRef<AnimationPlayState>, private viewContainer: ViewContainerRef) {}

  private renderView(showSpinner: boolean): void {
    if (showSpinner) {
      this.viewContainer.clear();
       this.viewContainer.createComponent<SpinnerComponent>(SpinnerComponent);
    } else {
      this.viewContainer.clear();
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }
}
