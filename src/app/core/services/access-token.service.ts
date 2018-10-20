import { LogService } from './log.service';

export interface IAccessTokenService {
	setAccessToken(accessToken: string): void;
	hasAccessToken(): boolean;
}

export class AccessTokenService implements IAccessTokenService {
	public static STORAGE_PROPERTY_NAME: string;
	public accessToken: string | null;

	private storage: Storage;
	private storagePropertyName: string;
	private changeListeners: Array<(accessToken: string) => void>;

	constructor(logService: LogService, storagePropertyName?: string) {
		this.storage = window.localStorage;
		this.storagePropertyName = storagePropertyName || AccessTokenService.STORAGE_PROPERTY_NAME;
		this.changeListeners = [];

		this.accessToken = this.storage.getItem(this.storagePropertyName);

		if (!this.accessToken) {
			logService.warn(`localStorage does not contain "${this.storagePropertyName}" property`);
		}
	}

	public setAccessToken(accessToken: string): void {
		if (accessToken === this.accessToken) {
			return;
		}

		if (!accessToken) {
			this.storage.removeItem(this.storagePropertyName);
		} else {
			this.storage.setItem(this.storagePropertyName, accessToken);
		}

		this.accessToken = accessToken;
		this.changeListeners.forEach(changeListener => changeListener(accessToken));
	}

	public hasAccessToken(): boolean {
		return !!this.accessToken;
	}
}
