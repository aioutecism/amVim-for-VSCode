import * as assert from 'assert';
import {TextObjectWord} from '../../src/TextObjects/Word';
import {Configuration} from '../../src/Configuration';

export function run() {

    Configuration.init();

    suite('findPreviousIndexOfDifferentCharacterKind finds correct index of different character', () => {
        test('with single word on line starting inside of word', (done) => {
            let line = '  word';
            let [indexInclusive, indexNonInclusive] = TextObjectWord.findStartCharacters(line, 4);
            assert.equal(indexNonInclusive, 2);
            assert.equal(indexInclusive, 0);
            done();
        });

        test('with multiple words starting inside of second word', (done) => {
            let line = 'word1-word2';
            let [indexInclusive, indexNonInclusive] = TextObjectWord.findStartCharacters(line, 9);
            let result = TextObjectWord.findStartCharacters(line, 9);
            assert.equal(indexNonInclusive, 6);
            assert.equal(indexInclusive, 6);
            done();
        });

        test('with multiple words starting inside of spaces', (done) => {
            let line = 'word1    word2';
            let [indexInclusive, indexNonInclusive] = TextObjectWord.findStartCharacters(line, 7);
            assert.equal(indexNonInclusive, 5);
            assert.equal(indexInclusive, 0);
            done();
        });

        test('with multiple words starting inside of second word', (done) => {
            let line = 'word1    word2';
            let [indexInclusive, indexNonInclusive] = TextObjectWord.findStartCharacters(line, 11);
            assert.equal(indexNonInclusive, 9);
            assert.equal(indexInclusive, 5);
            done();
        });

        test('with multiple words not separated by spaces and useBlankSeparatedStyle==true', (done) => {
            let line = 'word1   word2-word3 word4';
            let [indexInclusive, indexNonInclusive] = TextObjectWord.findStartCharacters(line, 16, true);
            assert.equal(indexNonInclusive, 8);
            assert.equal(indexInclusive, 5);
            done();
        });
    });

    suite('findNextIndexOfDifferentCharacterKind finds correct index of different character', () => {
        test('with single word starting inside of word', (done) => {
            let line = ' word  ';
            let [indexInclusive, indexNonInclusive] = TextObjectWord.findEndCharacters(line, 2);
            assert.equal(indexNonInclusive, 4);
            assert.equal(indexInclusive, 6);
            done();
        });

        test('with multiple words starting inside of second word', (done) => {
            let line = 'word1-word2  word3';
            let [indexInclusive, indexNonInclusive] = TextObjectWord.findEndCharacters(line, 9);
            assert.equal(indexNonInclusive, 10);
            assert.equal(indexInclusive, 12);
            done();
        });

        test('with multiple words starting inside of second word', (done) => {
            let line = 'word1    word2';
            let [indexInclusive, indexNonInclusive] = TextObjectWord.findEndCharacters(line, 11);
            assert.equal(indexNonInclusive, 14);
            assert.equal(indexInclusive, 14);
            done();
        });

        test('with multiple words starting inside of spaces', (done) => {
            let line = 'word1    word2 word3';
            let [indexInclusive, indexNonInclusive] = TextObjectWord.findEndCharacters(line, 7);
            assert.equal(indexNonInclusive, 8);
            assert.equal(indexInclusive, 13);
            done();
        });

        test('with multiple words not separated by spaces and useBlankSeparatedStyle==true', (done) => {
            let line = 'word1 word2-word3   word4 word5';
            let [indexInclusive, indexNonInclusive] = TextObjectWord.findEndCharacters(line, 6, true);
            assert.equal(indexNonInclusive, 16);
            assert.equal(indexInclusive, 19);
            done();
        });
    });
}
