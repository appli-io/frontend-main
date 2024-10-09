import { AsyncPipe, JsonPipe }                                                   from '@angular/common';
import { Component, DestroyRef, inject, OnInit }                                 from '@angular/core';
import { takeUntilDestroyed }                                                    from '@angular/core/rxjs-interop';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteTrigger, MatOption }                    from '@angular/material/autocomplete';
import { MatButton, MatIconButton }                                              from '@angular/material/button';
import { MatFormFieldModule }                                                    from '@angular/material/form-field';
import { MatIcon }                                                               from '@angular/material/icon';
import { MatInput }                                                              from '@angular/material/input';
import { MatProgressSpinner }                                                    from '@angular/material/progress-spinner';
import { MatTooltip }                                                            from '@angular/material/tooltip';

import { TranslocoDirective, TranslocoPipe }             from '@ngneat/transloco';
import { Notyf }                                         from 'notyf';
import { BehaviorSubject, combineLatestWith, map, take } from 'rxjs';

import { UserService }                  from '@core/user/user.service';
import { displayWithFn, filterByValue } from '@core/utils';
import { fuseAnimations }               from '@fuse/animations';
import { PageHeaderComponent }          from '@layout/components/page-header/page-header.component';
import { trackByFn }                    from '@libs/ui/utils/utils';
import { Board, Member }                from '@modules/admin/apps/scrumboard/models/scrumboard.models';
import { ScrumboardService }            from '@modules/admin/apps/scrumboard/services/scrumboard.service';
import { MemberService }                from '@modules/admin/user/member.service';
import { IUser }                        from '@modules/admin/user/profile/interfaces/user.interface';

@Component({
    selector   : 'app-members',
    standalone : true,
    imports   : [
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
        MatIconButton,
        MatTooltip,
        TranslocoPipe,
        MatProgressSpinner
    ],
    animations: fuseAnimations,
    templateUrl: './members.component.html',
})
export class MembersComponent implements OnInit {
    board: Board;
    deleting$: BehaviorSubject<boolean> = new BehaviorSubject(false);
    form: UntypedFormGroup;

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
        this.form = this._fb.group({
            member: [ '', Validators.required ]
        });
    }

    private _availableMembers$: BehaviorSubject<IUser[]> = new BehaviorSubject([]);

    private _filteredMembers$: BehaviorSubject<IUser[]> = new BehaviorSubject([]);

    get filteredMembers$() {
        return this._filteredMembers$.asObservable();
    }

    ngOnInit() {
        this._companyMemberService.members$
            .pipe(
                takeUntilDestroyed(this._destroy),
                combineLatestWith(this._userService.user$, this._boardService.board$),
                // remove me from the list by the id
                map(([ members, me, board ]) => {
                    this.board = board;

                    // Find the current user in the board members, and set it as disabled to delete it
                    const currentUser = board.members.find((member) => member.id === me.id);
                    if (currentUser) {
                        currentUser.deletable = true;
                    }

                    return members
                        // filter out members that are already in the board
                        .filter((member) => !board.members.some((m) => m.id === member.id))
                        // filter out the current user
                        .filter((member) => member.id !== me.id);
                }),
            )
            .subscribe((availableMembers) => {
                this._availableMembers$.next(availableMembers);
                this._filteredMembers$.next(availableMembers);
            });
    }

    public addMember() {
        if (this.form.invalid)
            return;

        this.form.disable();
        const member = this.form.value.member;

        this._boardService.addMember(this.board.id, member.id)
            .pipe(takeUntilDestroyed(this._destroy), take(1))
            .subscribe({
                next : () => {
                    this._notyf.success(`Member added successfully`);
                    this.form.reset();
                    this.form.markAsPristine();
                    this.form.enable();
                },
                error: (error) => {
                    this._notyf.error(`Error adding member: ${ error }`);
                    this.form.enable();
                }
            });
    }

    public deleteMember(memberId: string) {
        this.deleting$.next(true);

        this._boardService.removeMember(this.board.id, memberId)
            .pipe(takeUntilDestroyed(this._destroy), take(1))
            .subscribe({
                next : () => {
                    this._notyf.success(`Member removed successfully`);
                    this.deleting$.next(false);
                },
                error: (error) => {
                    this._notyf.error(`Error removing member: ${ error }`);
                    this.deleting$.next(false);
                }
            });
    }

    public filter(target: any) {
        const filterValue = target.value;
        if (!filterValue) {
            this._filteredMembers$.next(this._availableMembers$.value);
            return;
        }

        const filtered = filterByValue<IUser>(this._availableMembers$.value, filterValue, 'name');
        this._filteredMembers$.next(filtered);
    }
}
