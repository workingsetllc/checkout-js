import React from 'react';
import { createRoot, type Root } from 'react-dom/client';

import { configurePublicPath } from '../common/bundler';

import { type OrderConfirmationAppProps } from './OrderConfirmationApp';

export type RenderOrderConfirmationOptions = OrderConfirmationAppProps;
export type RenderOrderConfirmation = typeof renderOrderConfirmation;

export default function renderOrderConfirmation({
    containerId,
    publicPath,
    ...props
}: RenderOrderConfirmationOptions): void {
    const configuredPublicPath = configurePublicPath(publicPath);

    // We want to use `require` here because we want to set up the public path
    // first before importing the app component and its dependencies.
    const { default: OrderConfirmationApp } = require('./OrderConfirmationApp');

    // We want to use `require` here because we only want to import the package
    // in development mode.
    if (process.env.NODE_ENV === 'development') {
        const whyDidYouRender = require('@welldone-software/why-did-you-render');

        whyDidYouRender(React, {
            collapseGroups: true,
        });
    }

    const container = document.getElementById(containerId);

    if (!container) {
        throw new Error(`Container element with id "${containerId}" was not found.`);
    }

    const existingRoot: Root | undefined = (container as any).__reactRoot;
    const root = existingRoot ?? createRoot(container);

    if (!existingRoot) {
        (container as any).__reactRoot = root;
    }

    root.render(
        <OrderConfirmationApp
            containerId={containerId}
            publicPath={configuredPublicPath}
            {...props}
        />,
    );
}
