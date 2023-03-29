import L from 'leaflet';

const Icon = (title, color, size) => new L.DivIcon({
    html: title !== null        
        ? `<div style="display: flex; flex-direction: column; align-items: center"><svg stroke="currentColor" fill="${color}" stroke-width="0" viewBox="0 0 384 512" height="50%" width="50%" xmlns="http://www.w3.org/2000/svg"><path d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0z"></path></svg><div style="padding: 0 2px 0 2px; margin-top: 10px; background: white; border: 1px solid black">${title}</div></div>`
        : `<div style="display: flex; flex-direction: column; align-items: center"><svg stroke="currentColor" fill="${color}" stroke-width="0" viewBox="0 0 384 512" height="50%" width="50%" xmlns="http://www.w3.org/2000/svg"><path d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0z"></path></svg>`,
    iconSize: [size*2, size*2],
    className: 'dummy'    
});

export { Icon };