// tslint:disable:no-console

export interface ILogService {
	log(...args: any[]): void;
	warn(...args: any[]): void;
	error(...args: any[]): void;
	info(...args: any[]): void;
	debug(...args: any[]): void;
}

export class LogService implements ILogService {
	public log(...args: any[]): void {
		console.log(...args);
	}

	public warn(...args: any[]): void {
		console.warn(...args);
	}

	public error(...args: any[]): void {
		console.error(...args);
	}

	public info(...args: any[]): void {
		console.info(...args);
	}

	public debug(...args: any[]): void {
		if (console.debug) {
			console.debug(...args);
		} else {
			console.log(...args);
		}
	}
}
