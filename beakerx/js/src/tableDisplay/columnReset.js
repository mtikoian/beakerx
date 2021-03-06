/*
 *  Copyright 2017 TWO SIGMA OPEN SOURCE, LLC
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

var MenuHelper = require('./tableHeaderMenu/MenuHelper');

module.exports = function(TableScope) {

  TableScope.prototype.resetColumnHeatmap = function(columnIndex, cellHighlighters) {
    var highlighter = this.cellHighlighters[columnIndex];
    if (highlighter && highlighter instanceof cellHighlighters.HeatmapHighlighter) {
      this.showHideHeatmap(columnIndex);
    }
  };

  TableScope.prototype.resetColumnDataBars = function(columnIndex) {
    this.barsOnColumn.hasOwnProperty(columnIndex) && this.showHideBars(columnIndex);
  };

  TableScope.prototype.resetColumnContainerFixed = function(container) {
    var menuHelper = new MenuHelper(this);

    if (menuHelper.isFixedRight(container)) {
      this.pagination.fixRight = 0;git
    }
    if (menuHelper.isFixedLeft(container)) {
      this.pagination.fixLeft = 0;
    }

    this.updateFixedColumnsSeparator();
  };

  TableScope.prototype.resetColumnTypesAndAlignments = function(el, columnIndex) {
    var menuHelper = new MenuHelper(this);
    var typesAndAllignments = this.getColumnTypeAndAlignment(columnIndex);

    this.actualtype[columnIndex - 1] = typesAndAllignments.actualtype;
    menuHelper.doAlignment(el, typesAndAllignments.actualalign);
  };

  TableScope.prototype.resetColumnFilters = function(columnIndex) {
    var column = this.table.column(columnIndex);

    this.clearFilter(column, this.getColumnFilter(column));
    this.checkFilter();
  };

  TableScope.prototype.resetColumnSort = function(columnIndex) {
    var order = this.table.order();

    order.length && order[0][0] === columnIndex && this.table.order([]).draw();
  };

  TableScope.prototype.resetColumnSearch = function(columnIndex) {
    var column = this.table.column(columnIndex);

    column.search('');
    this.checkFilter();
  };

  TableScope.prototype.resetColumnWidth = function(columnIndex) {
    this.columnWidth = this.columnWidth.splice(columnIndex, 1);
  };
};
