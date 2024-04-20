import { Component, Inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent implements OnInit {
  progress = 100;
  private currentIntervalId: number;

  status: number;
  alertMessage: string = '';
  lang: string;

  duration: number = 5000;

  constructor(
    public sbRef: MatSnackBarRef<SnackbarComponent>,
    @Inject(MAT_SNACK_BAR_DATA)
    public data: any
  ) {
    this.sbRef.afterOpened().subscribe(
      () => {
        this.runProgressBar();
      },
      error => console.error(error)
    );
  }

  ngOnInit(): void {
    let message: string = this.data?.message ?? 'something_wrong';

    this.status = this.data.status;
    if (message.includes("'token'")) {
      this.alertMessage = 'dialog.unauthorized';
    } else {
      this.alertMessage = message.includes('dialog.')
        ? message
        : this.hasSpace(message)
        ? message
        : this.isAlphabet(message)
        ? 'dialog.' + message
        : message;
    }
  }

  isAlphabet(str): boolean {
    return /^[a-zA-Z()]+$/.test(str);
  }

  hasSpace(value: string): boolean {
    return /\s/g?.test(value);
  }

  dismissWithAction() {
    this.cleanProgressBarInterval();
    this.sbRef.dismissWithAction();
  }

  /**
   * @param duration - in milliseconds
   */
  runProgressBar() {
    this.progress = 100;
    const step = 0.005;
    this.cleanProgressBarInterval();
    this.currentIntervalId = setInterval(() => {
      this.progress -= 100 * step;
      if (this.progress < 0) {
        this.cleanProgressBarInterval();
        this.sbRef.dismissWithAction();
      }
    }, this.duration * step) as unknown as number;
  }

  cleanProgressBarInterval() {
    clearInterval(this.currentIntervalId);
  }

  onHover(): void {
    clearInterval(this.currentIntervalId);
  }

  onLeave(): void {
    const step = 0.005;
    this.cleanProgressBarInterval();
    this.currentIntervalId = setInterval(() => {
      this.progress -= 100 * step;
      if (this.progress < 0) {
        this.cleanProgressBarInterval();
        this.sbRef.dismissWithAction();
      }
    }, this.duration * step) as unknown as number;
  }
}
