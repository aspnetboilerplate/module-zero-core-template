import * as _ from 'lodash';

export class FormattedStringValueExtracter {

    Extract(str: string, format: string): ExtractionResult {
        if (str === format) //TODO: think on that!
        {
            return new ExtractionResult(true);
        }

        var formatTokens = new FormatStringTokenizer().Tokenize(format);
        if (!formatTokens) {
            return new ExtractionResult(str === "");
        }

        var result = new ExtractionResult(true);

        for (var i = 0; i < formatTokens.length; i++) {
            var currentToken = formatTokens[i];
            var previousToken = i > 0 ? formatTokens[i - 1] : null;

            if (currentToken.Type === FormatStringTokenType.ConstantText) {
                if (i === 0) {
                    if (str.indexOf(currentToken.Text) !== 0) {
                        result.IsMatch = false;
                        return result;
                    }

                    str = str.substr(currentToken.Text.length, str.length - currentToken.Text.length);
                }
                else {
                    var matchIndex = str.indexOf(currentToken.Text);
                    if (matchIndex < 0) {
                        result.IsMatch = false;
                        return result;
                    }


                    result.Matches.push({ name: previousToken.Text, value: str.substr(0, matchIndex) });
                    str = str.substring(0, matchIndex + currentToken.Text.length);
                }
            }
        }

        var lastToken = formatTokens[formatTokens.length - 1];//Last
        if (lastToken.Type === FormatStringTokenType.DynamicValue) {
            result.Matches.push({ name: lastToken.Text, value: str });
        }

        return result;
    }

    IsMatch(str: string, format: string): string[] {
        var result = new FormattedStringValueExtracter().Extract(str, format);
        if (!result.IsMatch) {
            return [];
        }

        let values = [];
        for (var i = 0; i < result.Matches.length; i++) {
            values.push(result.Matches[i].value);
        }

        return values;
    }
}

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
    DynamicValue
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
        let tokens: FormatStringToken[] = [];

        let currentText: string = '';
        var inDynamicValue = false;

        for (var i = 0; i < format.length; i++) {
            var c = format[i];
            switch (c) {
                case '{':
                    if (inDynamicValue) {
                        throw "Incorrect syntax at char " + i + "! format string can not contain nested dynamic value expression!";
                    }

                    inDynamicValue = true;

                    if (currentText.length > 0) {
                        tokens.push(new FormatStringToken(currentText, FormatStringTokenType.ConstantText));
                        currentText = '';
                    }

                    break;
                case '}':
                    if (!inDynamicValue) {
                        throw ("Incorrect syntax at char " + i + "! These is no opening brackets for the closing bracket }.");
                    }

                    inDynamicValue = false;

                    if (currentText.length <= 0) {
                        throw ("Incorrect syntax at char " + i + "! Brackets does not containt any chars.");
                    }

                    var dynamicValue = currentText;
                    if (includeBracketsForDynamicValues) {
                        dynamicValue = "{" + dynamicValue + "}";
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
            throw ("There is no closing } char for an opened { char.");
        }

        if (currentText.length > 0) {
            tokens.push(new FormatStringToken(currentText, FormatStringTokenType.ConstantText));
        }

        return tokens;
    }

}