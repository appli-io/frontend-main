import { Component, DestroyRef, inject, OnInit }                                 from '@angular/core';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule }                                                    from '@angular/material/form-field';
import { TranslocoDirective }                                                    from '@ngneat/transloco';
import { PageHeaderComponent }                                                   from '@layout/components/page-header/page-header.component';
import { MatAutocomplete, MatAutocompleteTrigger, MatOption }                    from '@angular/material/autocomplete';
import { trackByFn }                                                             from '@libs/ui/utils/utils';
import { AsyncPipe, JsonPipe }                                                   from '@angular/common';
import { MatInput }                                                              from '@angular/material/input';
import { MemberService }                                                         from '@modules/admin/user/member.service';
import { BehaviorSubject, map, tap, withLatestFrom }                             from 'rxjs';
import { IUser }                                                                 from '@modules/admin/user/profile/interfaces/user.interface';
import { takeUntilDestroyed }                                                    from '@angular/core/rxjs-interop';
import { UserService }                                                           from '@core/user/user.service';
import { ScrumboardService }                                                     from '@modules/admin/apps/scrumboard/services/scrumboard.service';
import { Board, Member }                                                         from '@modules/admin/apps/scrumboard/models/scrumboard.models';
import { Notyf }                                                                 from 'notyf';
import { displayWithFn, filterByValue }                                          from '@core/utils';
import { MatIcon }                                                               from '@angular/material/icon';
import { MatButton, MatIconButton }                                              from '@angular/material/button';

@Component({
    selector   : 'app-members',
    standalone : true,
    imports    : [
        ReactiveFormsModule,
        MatFormFieldModule,
        TranslocoDirective,
        PageHeaderComponent,
        MatAutocompleteTrigger,
        MatAutocomplete,
        MatOption,
        AsyncPipe,
        MatInput,
        JsonPipe,
        MatIcon,
        MatButton,
        MatIconButton
    ],
    templateUrl: './members.component.html',

})
export class MembersComponent implements OnInit {
    public memberForm: UntypedFormGroup;
    public board: Board;
    protected readonly trackByFn = trackByFn;
    protected readonly displayWithFn = displayWithFn<Member>;
    private readonly _destroy: DestroyRef = inject(DestroyRef);
    private _notyf = new Notyf();

    constructor(
        private readonly _fb: UntypedFormBuilder,
        private readonly _userService: UserService,
        private readonly _companyMemberService: MemberService,
        private readonly _boardService: ScrumboardService
    ) {
        this.memberForm = this._fb.group({
            member: [ '', Validators.required ]
        });
    }

    private _availableMembers$: BehaviorSubject<IUser[]> = new BehaviorSubject([]);

    get availableMembers$() {
        return this._availableMembers$.asObservable();
    }

    private _filteredMembers$: BehaviorSubject<IUser[]> = new BehaviorSubject([]);

    get filteredMembers$() {
        return this._filteredMembers$.asObservable();
    }

    ngOnInit() {
        this._companyMemberService.members$
            .pipe(
                takeUntilDestroyed(this._destroy),
                withLatestFrom(this._userService.user$),
                // remove me from the list by the id
                map(([ members, me ]) => members.filter((member) => member.id !== me.id)),
                withLatestFrom(this._boardService.board$),
                tap(([ , board ]) => this.board = board),
                // remove members that are already in the board
                map(([ members, board ]) => members.filter((member) => !board.members.some((m) => m.id === member.id)))
            )
            .subscribe((object) => {
                this._availableMembers$.next(object);
                this._filteredMembers$.next(object);
            });
    }

    public addMember() {

    }

    public filter(target: any) {
        const filterValue = target.value;
        if (!filterValue) {
            this._filteredMembers$.next(this._availableMembers$.value);
            return;
        }

        const filtered = filterByValue(this._availableMembers$.value, filterValue, 'name');
        this._filteredMembers$.next(filtered);
    }
}
