export function parse(data) {
    // индекс для быстрого поиска
    const index = {}
    const center = [0,0];
    
    // representatives опорные точки (все точки)
    
    // находим среднюю точку
    data.representatives.forEach(({id, c}) => {
        index[id] = c;
        center[0] += c[0];
        center[1] += c[1];
    });
    center[0] = center[0] / data.representatives.length;
    center[1] = center[1] / data.representatives.length;
    console.log(`representatives count: ${data.representatives.length}`)
    
    // congestion - замедления 
    data.congestion = data.congestion.map(({f, t, d}) => {
        const arr = [];
        for (let i = 0; i < d.length; i += 2) {
            arr.push(100 - Number(`0x${d[i]}${d[i + 1]}`));
        }

        return { f, t, d: arr };
    })

    return { data, index, center }
}
