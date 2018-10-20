import axios from 'axios';
import { AxiosInstance } from 'axios';
import * as uuid from 'uuid/v4';
import { includes } from 'lodash';
import { AccessTokenService } from './access-token.service';
import { NavigationService } from './navigation.service';

const AllowedMethods = {
	GET: 'get',
	POST: 'post',
	PUT: 'put',
	DELETE: 'delete'
};

interface IApplicationConfig {
	BASE_URL?: string;
}

export interface IApiService {
	get(url: string, data?: object): Promise<object>;
	post(url: string, data?: object): Promise<object>;
	put(url: string, data?: object): Promise<object>;
	delete(url: string, data?: object): Promise<object>;
}

export class ApiService implements IApiService {
	public static DEFAULT_BASE_URL: string = '/api';

	private fetch: AxiosInstance;
	private applicationConfig: IApplicationConfig;
	private accessTokenService: AccessTokenService;
	private navigationService: NavigationService;

	constructor(
		applicationConfig: IApplicationConfig,
		accessTokenService: AccessTokenService,
		navigationService: NavigationService
	) {
		this.applicationConfig = applicationConfig;
		this.accessTokenService = accessTokenService;
		this.navigationService = navigationService;

		this.fetch = axios.create({
			baseURL: applicationConfig.BASE_URL || ApiService.DEFAULT_BASE_URL,
			timeout: 2500,
			headers: {
				'X-Window-Id': uuid(),
				'X-JWT-Authorization': `Bearer ${accessTokenService.accessToken}`
			}
		});
	}

	public async get(url: string, data: object = {}): Promise<object> {
		return await this.sendRequest(AllowedMethods.GET, url, data);
	}

	public async post(url: string, data: object = {}): Promise<object> {
		return await this.sendRequest(AllowedMethods.POST, url, data);
	}

	public async put(url: string, data: object = {}): Promise<object> {
		return await this.sendRequest(AllowedMethods.PUT, url, data);
	}

	public async delete(url: string, data: object = {}): Promise<object> {
		return await this.sendRequest(AllowedMethods.DELETE, url, data);
	}

	public async sendRequest(method: string, url: string, data: object): Promise<object> {
		const params: object = {};

		if (!includes([AllowedMethods.POST, AllowedMethods.PUT, AllowedMethods.DELETE], method)) {
			Object.assign(params, data);
		}

		return await this.fetch({ method, url, data, params })
			.then(response => this.handleResponse(response))
			.catch(error => this.handleError(error));
	}

	private handleResponse(response: object): Promise<object> {
		// TODO: handle response format
		return Promise.resolve(response);
	}

	private handleError(error: object): Promise<object> {
		// TODO: handle error
		return Promise.reject(error);
	}
}
