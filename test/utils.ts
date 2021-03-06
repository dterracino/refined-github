import test from 'ava';
import './fixtures/globals';
import {
	getDiscussionNumber,
	getOwnerAndRepo,
	getRepoPath,
	parseTag
} from '../source/libs/utils';

test('getDiscussionNumber', t => {
	const pairs = new Map<string, boolean|string>([
		[
			'https://github.com',
			false
		],
		[
			'https://gist.github.com/',
			false
		],
		[
			'https://github.com/settings/developers',
			false
		],
		[
			'https://github.com/sindresorhus/notifications/notifications',
			false
		],
		[
			'https://github.com/sindresorhus/refined-github',
			false
		],
		[
			'https://github.com/sindresorhus/refined-github/',
			false
		],
		[
			'https://github.com/sindresorhus/refined-github/blame/master/package.json',
			false
		],
		[
			'https://github.com/sindresorhus/refined-github/commit/57bf4',
			false
		],
		[
			'https://github.com/sindresorhus/refined-github/compare/test-branch?quick_pull=0',
			false
		],
		[
			'https://github.com/sindresorhus/refined-github/tree/master/distribution',
			false
		],
		[
			'https://github.com/sindresorhus/refined-github/pull/148/commits/0019603b83bd97c2f7ef240969f49e6126c5ec85',
			'148'
		],
		[
			'https://github.com/sindresorhus/refined-github/pull/148/commits/00196',
			'148'
		],
		[
			'https://github.com/sindresorhus/refined-github/pull/148/commits',
			'148'
		],
		[
			'https://github.com/sindresorhus/refined-github/pull/148',
			'148'
		],
		[
			'https://github.com/sindresorhus/refined-github/issues/146',
			'146'
		],
		[
			'https://github.com/sindresorhus/refined-github/issues',
			false
		]
	]);
	for (const [url, result] of pairs) {
		location.href = url;
		t.is(result, getDiscussionNumber());
	}
});

test('getRepoPath', t => {
	const pairs = new Map<string, string | undefined>([
		[
			'https://github.com',
			undefined
		],
		[
			'https://gist.github.com/',
			undefined
		],
		[
			'https://github.com/settings/developers',
			undefined
		],
		[
			'https://github.com/sindresorhus/notifications/notifications',
			undefined
		],
		[
			'https://github.com/sindresorhus/refined-github',
			''
		],
		[
			'https://github.com/sindresorhus/refined-github/',
			''
		],
		[
			'https://github.com/sindresorhus/refined-github/blame/master/package.json',
			'blame/master/package.json'
		],
		[
			'https://github.com/sindresorhus/refined-github/commit/57bf4',
			'commit/57bf4'
		],
		[
			'https://github.com/sindresorhus/refined-github/compare/test-branch?quick_pull=0',
			'compare/test-branch'
		],
		[
			'https://github.com/sindresorhus/refined-github/tree/master/distribution',
			'tree/master/distribution'
		]
	]);

	for (const [url, result] of pairs) {
		location.href = url;
		t.is(result, getRepoPath());
	}
});

test('getOwnerAndRepo', t => {
	const ownerAndRepo: {
		[url: string]: {
			[prop: string]: string;
		};
	} = {
		'https://github.com/sindresorhus/refined-github/pull/148': {
			ownerName: 'sindresorhus',
			repoName: 'refined-github'
		},
		'https://github.com/DrewML/GifHub/blob/master/.gitignore': {
			ownerName: 'DrewML',
			repoName: 'GifHub'
		}
	};

	Object.keys(ownerAndRepo).forEach(url => {
		location.href = url;
		t.deepEqual(ownerAndRepo[url], getOwnerAndRepo());
	});
});

test('parseTag', t => {
	t.deepEqual(parseTag(''), {namespace: '', version: ''});
	t.deepEqual(parseTag('1.2.3'), {namespace: '', version: '1.2.3'});
	t.deepEqual(parseTag('@1.2.3'), {namespace: '', version: '1.2.3'});
	t.deepEqual(parseTag('hi@1.2.3'), {namespace: 'hi', version: '1.2.3'});
	t.deepEqual(parseTag('hi/you@1.2.3'), {namespace: 'hi/you', version: '1.2.3'});
	t.deepEqual(parseTag('@hi/you@1.2.3'), {namespace: '@hi/you', version: '1.2.3'});
});
