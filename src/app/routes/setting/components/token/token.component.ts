import { Component, inject } from '@angular/core';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { pAdmin } from 'src/app/helpers/permission';
import { DESTROYER$ } from 'src/app/helpers/unsubscribe';
import { NSAFToken } from 'src/app/models/nsaf-token';
import { NsafTokenService } from 'src/app/services/nsaf-token.service';

@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.scss']
})
export class TokenComponent {
  private readonly destroyer$ = DESTROYER$();

  private tokenService = inject(NsafTokenService);

  pToken = pAdmin.systemConfig;
  token: NSAFToken;

  ngOnInit(): void {
    this.onLoad();
  }

  onLoad(): void {
    this.tokenService
      .getOne()
      .pipe(takeUntil(this.destroyer$))
      .subscribe({
        next: res => {
          this.token = res;
        }
      });
  }
}
