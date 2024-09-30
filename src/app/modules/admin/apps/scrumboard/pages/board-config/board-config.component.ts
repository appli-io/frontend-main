import { Component, Input }                                    from '@angular/core';
import { MatAnchor, MatIconAnchor }                            from '@angular/material/button';
import { MatIcon }                                             from '@angular/material/icon';
import { RouterLink, RouterOutlet }                            from '@angular/router';
import { Board }                                               from '@modules/admin/apps/scrumboard/models/scrumboard.models';
import { DrawerContentComponent }                              from '../../../../../../shared/components/drawer-listing/components/drawer-content.component';
import { DrawerListingComponent }                              from '../../../../../../shared/components/drawer-listing/drawer-listing.component';
import { TranslocoDirective, TranslocoPipe, TranslocoService } from '@ngneat/transloco';
import { PanelType }                                           from '../../../../../../shared/components/drawer-listing/panel.type';

@Component({
    selector   : 'app-board-config',
    standalone : true,
    imports    : [
        MatAnchor,
        MatIcon,
        MatIconAnchor,
        RouterLink,
        DrawerContentComponent,
        DrawerListingComponent,
        RouterOutlet,
        TranslocoDirective,
        TranslocoPipe
    ],
    templateUrl: './board-config.component.html'
})
export class BoardConfigComponent {
    @Input('board') board: Board;

    panels: PanelType[] = [];
    selectedPanel: PanelType;

    constructor(private readonly _ts: TranslocoService) {
        this.panels = [
            {
                id         : 'board-info',
                icon       : 'heroicons_outline:information-circle',
                title      : this._ts.translate('scrumboard.settings.board-info.title'),
                description: this._ts.translate('scrumboard.settings.board-info.description'),
                link       : [ './board-info' ]
            }
        ];

        this.selectedPanel = this.panels[0];
    }

    public onPanelSelected(panel: PanelType) {
        this.selectedPanel = panel;
    }
}
