import { IBoard, ICard, ILabel, IList, IMember, } from '@modules/admin/apps/scrumboard/models/scrumboard.types';
import { IFile }                                  from '@modules/admin/news/domain/interfaces/news.interface';

// -----------------------------------------------------------------------------------------------------
// @ Board
// -----------------------------------------------------------------------------------------------------
export class Board implements Required<IBoard> {
    id: string | null;
    title: string;
    description: string | null;
    icon: string | null;
    lastActivity: string | null;
    lists: List[];
    labels: Label[];
    members: Member[];

    /**
     * Constructor
     */
    constructor(board: IBoard) {
        this.id = board.id || null;
        this.title = board.title;
        this.description = board.description || null;
        this.icon = board.icon || null;
        this.lastActivity = board.lastActivity || null;
        this.lists = [];
        this.labels = [];
        this.members = [];

        // Lists
        if (board.lists) {
            this.lists = board.lists.map((list) => {
                if (!(list instanceof List)) {
                    return new List(list);
                }

                return list;
            });
        }

        // Labels
        if (board.labels) {
            this.labels = board.labels.map((label) => {
                if (!(label instanceof Label)) {
                    return new Label(label);
                }

                return label;
            });
        }

        // Members
        if (board.members) {
            this.members = board.members.map((member) => {
                if (!(member instanceof Member)) {
                    return new Member(member);
                }

                return member;
            });
        }
    }
}

// -----------------------------------------------------------------------------------------------------
// @ List
// -----------------------------------------------------------------------------------------------------
export class List implements Required<IList> {
    id: string | null;
    boardId: string;
    position: number;
    title: string;
    cards: Card[];

    /**
     * Constructor
     */
    constructor(list: IList) {
        this.id = list.id || null;
        this.boardId = list.boardId;
        this.position = list.position;
        this.title = list.title;
        this.cards = [];

        // Cards
        if (list.cards) {
            this.cards = list.cards.map((card) => {
                if (!(card instanceof Card)) {
                    return new Card(card);
                }

                return card;
            });
        }
    }
}

// -----------------------------------------------------------------------------------------------------
// @ Card
// -----------------------------------------------------------------------------------------------------
export class Card implements Required<ICard> {
    id: string | null;
    boardId: string;
    listId: string;
    position: number;
    title: string;
    description: string | null;
    labels: Label[];
    dueDate: string | null;
    coverImage: string | null;

    /**
     * Constructor
     */
    constructor(card: ICard) {
        this.id = card.id || null;
        this.boardId = card.boardId;
        this.listId = card.listId;
        this.position = card.position;
        this.title = card.title;
        this.description = card.description || null;
        this.labels = [];
        this.dueDate = card.dueDate || null;

        // Labels
        if (card.labels) {
            this.labels = card.labels.map((label) => {
                if (!(label instanceof Label)) {
                    return new Label(label);
                }

                return label;
            });
        }
    }
}

// -----------------------------------------------------------------------------------------------------
// @ Member
// -----------------------------------------------------------------------------------------------------
export class Member implements IMember {
    id: string;
    name: string;
    avatar?: IFile;
    position?: string;

    // internal use only
    deletable?: boolean;

    constructor(member: IMember) {
        this.id = member.id;
        this.name = member.name;
        this.avatar = member.avatar || null;
        this.position = member.position || null;
    }
}

// -----------------------------------------------------------------------------------------------------
// @ Label
// -----------------------------------------------------------------------------------------------------
export class Label implements Required<ILabel> {
    id: string | null;
    boardId: string;
    title: string;

    // internal use only
    deletable?: boolean;

    /**
     * Constructor
     */
    constructor(label: ILabel) {
        this.id = label.id || null;
        this.boardId = label.boardId;
        this.title = label.title;
    }
}
