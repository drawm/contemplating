type Printable = string | number | undefined | null;
type Printables = Printable | Printables[];
type TemplateStringsArguments = [strings: TemplateStringsArray, ...values: Printables[]];

/**
 * TODO: What single character can I use instead?
 * TODO: Wait for promises to render?
 *
 * Template string method which provides common templating features not available in JS:
 *   - undefined & null is converted to ''
 *   - Arrays are joined without seperator
 */
export function template(strings: TemplateStringsArray | TemplateStringsArguments, ...values: Printables[]): string {
   // Normalize arguments in case they come from a "regular" function call
   if(Array.isArray(strings[0])){
     // @ts-ignore
     [strings, ...values] = strings;
   }

    let acc = '';
    for (let i = 0; i < strings.length; i++) {
        acc += strings[i];

        if (Array.isArray(values[i])) {
            acc += (values[i] as Printables[])
                .map(value => value ?? '')
                .join('');
        } else {
            acc += (values[i] ?? '');
        }
    }

    return acc;
}

export function print(text: Printable, defaultText: string = '') {
    return !!text
        ? text
        : defaultText;
}

type LoopState = {
    isFirst: boolean,
    isLast: boolean,
};

type LoopCallback = <I>(item:I, state:LoopState)=>string;

export const loop = <I>(list:I[], callback:LoopCallback):string => {
    let acc = '';
    const state:LoopState = {
        isFirst: true,
        isLast: false,
    };

    for (let i = 0; i < list.length; i++) {
        const item:I = list[i];
        state.isLast = i === list.length - 1;

        acc += callback<I>(item, state);
        state.isFirst = false;
    }

    return acc;
};

