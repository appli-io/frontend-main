import { Component, Input } from '@angular/core';
import { IUser }            from '@modules/admin/user/profile/interfaces/user.interface';
import { NgClass }          from '@angular/common';

@Component({
    selector   : 'user-avatar',
    standalone : true,
    imports    : [
        NgClass
    ],
    templateUrl: './user-avatar.component.html',
    styles     : `
        :host {
            display: flex;
            align-items: center;
        }
    `
})
export class UserAvatarComponent {
    @Input() user: IUser;
    @Input() avatarClass: string[] = [];
    @Input() showName: boolean = false;
}
