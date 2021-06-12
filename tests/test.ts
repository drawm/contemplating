import {template, print, loop} from '../src/mod.ts';
import { assert, assertEquals } from "https://deno.land/std@0.98.0/testing/asserts.ts";

Deno.test('template() is able to work with template string', ()=>{
    const output = template`hello world`;
    assert(output);
    assertEquals(output, 'hello world');
});

Deno.test('template() properly accept any variables of basic type', ()=>{
    assertEquals(template`hello ${"world"}`, 'hello world');
    assertEquals(template`hello ${1337}`, 'hello 1337');

    // Typing should complain
    assertEquals(template`${'hello'} ${'world'}`, 'hello world');
    assertEquals(template`${['hello', 'world']}`, 'helloworld');
    assertEquals(template`${['hello', 1337]}`, 'hello1337');
});

Deno.test('template() convert null & undefined to empty string', ()=>{
    assertEquals(template`hello "${null}"`, 'hello ""');
    assertEquals(template`hello "${undefined}"`, 'hello ""');

    // Typing should complain
    assertEquals(template`${undefined} ${null}`, ' ');
    assertEquals(template`${[null, undefined]}`, '');
    assertEquals(template`${['hello', null, 'world', undefined]}`, 'helloworld');
});
