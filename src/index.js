/*var Mock=require('mockjs');
var $=require('jquery');

Mock.mock('./data.json',{
    'list|1-10':[{
        'id|+1':1,
        email:'@email',
        mobile:/^1[0-9]{10}$/,
        name:'@cName',
        'age|18-20':1,
        'sex|1':['男','女'],
        addr:Mock.mock('@county(true)'),
        data:Mock.Random.now(),
        'money|1-1100':1
    }]
});

$.ajax({
    type: "GET",
    url:'./data.json',
    dataType:'json',
    success:function(data) {
        $('#root').text(JSON.stringify(data,null,' '));
    },
    error:function(err){
        console.log(err);
    }
});*/

import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.js';

ReactDOM.render(
  <div>Hello</div>,
  document.getElementById('root')
);
