const letters = ['a', 'c', 'e', 'i', 'n', 'o', 'u', 'y'];
type Letters = (typeof letters)[number];

const latinCharacters: Record<Letters, string> = {
	a: 'āáǎàȁâãạảȃạ̈äåǻąȧậặḁẚæǽǣ',
	c: 'ćĉċčçḉ',
	e: 'ēéěèȅêęëėẹẽĕȇȩę̋ḕḗḙḛḝė̄',
	i: 'īíǐìȉîĩịỉȋïḯ',
	n: 'ńņňñṅŉǹȵ',
	o: 'ōóǒòȍôõọỏȏơǫőǿœṍṏ',
	u: 'ūúǔùȕûũụủȗůűṹṻüǜǚǘǖ',
	y: 'ýŷÿẏȳỳỵỷỹ',
};

export const regexDiacriticSupport = (str: string): RegExp => {
	const lowercaseString = str.toLowerCase();
	let regex = '';

	for (const char of lowercaseString) {
		regex +=
			char in latinCharacters ? `[${char}${latinCharacters[char]}]` : char;
	}

	return new RegExp(`.*${regex}.*`, 'i');
};