import { ICompany }        from '@core/domain/interfaces/company.interface';
import { IEventUrl }       from '@modules/admin/home/interface/event-url.interface';
import { IEventOrganizer } from '@modules/admin/home/interface/event-organizer.interface';
import { EventTypeEnum }   from '@modules/admin/home/enums/event-type.enum';
import { EventStatusEnum } from '@modules/admin/home/enums/event-status.enum';
import { IUser }           from '@modules/admin/user/profile/interfaces/user.interface';

export class IEvent {
  public id: string;
  public title: string;
  public description: string;
  public isAllDay: boolean = false;
  public startDate?: unknown;
  public endDate: unknown;
  public location: string;
  public url?: IEventUrl[];
  public image: string;
  public capacity?: number;
  public organizer: IEventOrganizer;
  public type: EventTypeEnum;
  public status: EventStatusEnum;
  public createdAt: Date;
  public updatedAt: Date;
  public createdBy: IUser;
  public company: ICompany;
}
