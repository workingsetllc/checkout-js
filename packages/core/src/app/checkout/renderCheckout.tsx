import React from 'react';
import { createRoot, type Root } from 'react-dom/client';

import { configurePublicPath } from '../common/bundler';

import { type CheckoutAppProps } from './CheckoutApp';

export type RenderCheckoutOptions = CheckoutAppProps;
export type RenderCheckout = typeof renderCheckout;

export default function renderCheckout({
    containerId,
    publicPath,
    ...props
}: RenderCheckoutOptions): void {
    const configuredPublicPath = configurePublicPath(publicPath);

    // We want to use `require` here because we want to set up the public path
    // first before importing the app component and its dependencies.
    const { default: CheckoutApp } = require('./CheckoutApp');

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
        <CheckoutApp containerId={containerId} publicPath={configuredPublicPath} {...props} />,
    );
}
