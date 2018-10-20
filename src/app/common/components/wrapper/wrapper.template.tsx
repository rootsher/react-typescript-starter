import * as React from 'react';

interface IProps {
	children: React.ReactNode;
}

export const Template = ({ children }: IProps) => <div>{children}</div>;

export default Template;
