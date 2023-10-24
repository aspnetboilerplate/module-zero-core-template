class ExtractionResult {
    public IsMatch: boolean;
    public Matches: any[];

    constructor(isMatch: boolean) {
        this.IsMatch = isMatch;
        this.Matches = [];
    }
}

enum FormatStringTokenType {
    ConstantText,
    DynamicValue,
}

class FormatStringToken {
    public Text: string;

    public Type: FormatStringTokenType;

    constructor(text: string, type: FormatStringTokenType) {
        this.Text = text;
        this.Type = type;
    }
}

class FormatStringTokenizer {
    Tokenize(format: string, includeBracketsForDynamicValues: boolean = false): FormatStringToken[] {
        const tokens: FormatStringToken[] = [];

        let currentText = '';
        let inDynamicValue = false;

        for (let i = 0; i < format.length; i++) {
            const c = format[i];
            switch (c) {
                case '{':
                    if (inDynamicValue) {
                        throw new Error(
                            'Incorrect syntax at char ' +
                            i +
                            '! format string can not contain nested dynamic value expression!'
                        );
                    }

                    inDynamicValue = true;

                    if (currentText.length > 0) {
                        tokens.push(new FormatStringToken(currentText, FormatStringTokenType.ConstantText));
                        currentText = '';
                    }

                    break;
                case '}':
                    if (!inDynamicValue) {
                        throw new Error(
                            'Incorrect syntax at char ' +
                            i +
                            '! These is no opening brackets for the closing bracket }.'
                        );
                    }

                    inDynamicValue = false;

                    if (currentText.length <= 0) {
                        throw new Error('Incorrect syntax at char ' + i + '! Brackets does not containt any chars.');
                    }

                    let dynamicValue = currentText;
                    if (includeBracketsForDynamicValues) {
                        dynamicValue = '{' + dynamicValue + '}';
                    }

                    tokens.push(new FormatStringToken(dynamicValue, FormatStringTokenType.DynamicValue));
                    currentText = '';

                    break;
                default:
                    currentText += c;
                    break;
            }
        }

        if (inDynamicValue) {
            throw new Error('There is no closing } char for an opened { char.');
        }

        if (currentText.length > 0) {
            tokens.push(new FormatStringToken(currentText, FormatStringTokenType.ConstantText));
        }

        return tokens;
    }
}

export class FormattedStringValueExtracter {
    Extract(str: string, format: string): ExtractionResult {
        if (str === format) {
            return new ExtractionResult(true);
        }

        const formatTokens = new FormatStringTokenizer().Tokenize(format);
        if (!formatTokens) {
            return new ExtractionResult(str === '');
        }

        const result = new ExtractionResult(true);

        for (let i = 0; i < formatTokens.length; i++) {
            const currentToken = formatTokens[i];
            const previousToken = i > 0 ? formatTokens[i - 1] : null;

            if (currentToken.Type === FormatStringTokenType.ConstantText) {
                if (i === 0) {
                    if (str.indexOf(currentToken.Text) !== 0) {
                        result.IsMatch = false;
                        return result;
                    }

                    str = str.substr(currentToken.Text.length, str.length - currentToken.Text.length);
                } else {
                    const matchIndex = str.indexOf(currentToken.Text);
                    if (matchIndex < 0) {
                        result.IsMatch = false;
                        return result;
                    }

                    result.Matches.push({ name: previousToken?.Text, value: str.substr(0, matchIndex) });
                    str = str.substring(0, matchIndex + currentToken.Text.length);
                }
            }
        }

        const lastToken = formatTokens[formatTokens.length - 1];
        if (lastToken.Type === FormatStringTokenType.DynamicValue) {
            result.Matches.push({ name: lastToken.Text, value: str });
        }

        return result;
    }

    IsMatch(str: string, format: string): string[] {
        const result = new FormattedStringValueExtracter().Extract(str, format);
        if (!result.IsMatch) {
            return [];
        }

        const values: any[] = [];
        for (let i = 0; i < result.Matches.length; i++) {
            values.push(result.Matches[i].value);
        }

        return values;
    }
}
