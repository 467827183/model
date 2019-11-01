import React from 'react';
import SelectWords from './selectWords'
import WordList from './wordList';
export default function SimpleTable() {
    return (
      <div>
          <WordList/>
          <SelectWords/>
      </div>
    );
}