import { ApiService } from '../api.service';

export interface IAuthService {
	login(): Promise<object>;
	logout(): Promise<object>;
}

export class AccessTokenService implements IAuthService {
	private apiService: ApiService;

	constructor(apiService: ApiService) {
		this.apiService = apiService;
	}

	public async login(): Promise<object> {
		return await this.apiService.post('v1/login');
	}

	public async logout(): Promise<object> {
		return await this.apiService.post('v1/logout');
	}
}
