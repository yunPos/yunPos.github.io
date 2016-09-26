// type值所表示的意思，有type属性说明没有没有子集
// 1.圆桌     2.方桌     3.吧台
// 4.横墙    5.竖墙    6.墙体3
//7.预留1-1   8.预留选项2

//1000.删除桌台  1001.合并桌台   1002. 搭台

//10000删除墙

// pid 表示层级
var data = {
	documentRight:[  //文档右键数据
		{
			id:1,
			pid:0,
			title:"桌台"
		},
		{
			id:2,
			pid:0,
			title:"墙体"
		},
		{
			id:3,
			pid:0,
			title:"背景"
		},
		{
			id:4,
			pid:0,
			title:"预留选项",
			type:8
		},
		{
			id:5,
			pid:1,
			title:"圆桌",
			type:1
		},
		{
			id:6,
			pid:1,
			title:"方桌",
			type:2
		},
		{
			id:7,
			pid:1,
			title:"吧台",
			type:3
		},
		{
			id:8,
			pid:2,
			title:"横墙",
			type:4
		},
		{
			id:9,
			pid:2,
			title:"竖墙",
			type:5
		},
		{
			id:10,
			pid:2,
			title:"墙体3",
			type:6
		},
		{
			id:12,
			pid:3,
			title:"上传背景",
			type:7
		},
		{
			id:11,
			pid:3,
			title:"上传背景",
			type:7
		},
		{
			id:11,
			pid:3,
			title:"上传背景",
			type:7
		},
		{
			id:11,
			pid:3,
			title:"上传背景",
			type:7
		}
	],
	diningTableRight:[   //桌台右键数据
		{
			id:1,
			pid:0,
			title:"删除桌台",
			type:1000
		},
		{
			id:2,
			pid:0,
			title:"合并桌台",
			type:1001
		},
		{
			id:3,
			pid:0,
			title:"搭台",
			type:1002
		},
		// {
		// 	id:4,
		// 	pid:0,
		// 	title:"预留选项2"
		// },
		// {
		// 	id:5,
		// 	pid:1,
		// 	title:"圆桌"
		// },
		// {
		// 	id:6,
		// 	pid:1,
		// 	title:"方桌"
		// },
		// {
		// 	id:7,
		// 	pid:1,
		// 	title:"吧台"
		// }
	],
	wallRight:[   //桌台右键数据
		{
			id:1,
			pid:0,
			title:"删除墙",
			type:10000
		}
	]
}
