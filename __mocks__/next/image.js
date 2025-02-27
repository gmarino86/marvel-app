import * as React from 'react';

// Mock de `next/image` para que use `<img>` estándar en los tests
const NextImage = ({ src, alt, ...props }) => {
    return <img src={src} alt={alt} {...props} />;
};

export default NextImage;
