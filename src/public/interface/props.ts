import { History, Location } from 'history';
import { Dispatch } from 'redux';
import { USERState } from '@store/reducers/user';

interface Match {
	path: string,
	url: string
	params: any,
	[propName: string]: any
}

export interface RouteProps {
	history: History;
	location: Location;
	match: Match;
	route: any;
	dispatch?: Dispatch;
	UpdateUSER?: (obj: USERState) => USERState;
	ClearUSER?: () => object;
	UpdatePower?: (obj: any) => object;
	cancelModal: (refresh?: boolean) => void;
	USER?: USERState;
	Power?: any;
	Company?: any;
}
