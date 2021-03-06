function getCommonPagesPath (path) {
  return resolve => require([`@/pages/${path}`], resolve)
}


export default{
	Index: getCommonPagesPath('Index/Index'),
	Sheets: getCommonPagesPath('Sheets/Index'),
	HotsSheets: getCommonPagesPath('Sheets/Hots'),
	HighQuality: getCommonPagesPath('Sheets/HighQuality'),

	SheetsDetails: getCommonPagesPath('Sheets/Details/Index'),
	SheetsDetailsShow: getCommonPagesPath('Sheets/Details/Detail'),


}
