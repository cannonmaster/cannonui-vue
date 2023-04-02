//@ts-ignore
import React, { FunctionComponent, useEffect, useState } from 'react';
import classNames from 'classnames';
import '../table.scss';

export interface TableProps {
  bordered?: boolean;
  data?: {}[];
  striped?: boolean;
  noData?: string;
  style?: {};
  columns?: any[];
  className?: string;
  onSort?: (item: any, data: any) => void;
  summary?: string;
}
const defaultProps = {
  bordered: true,
  data: [],
  striped: false,
  noData: '无数据',
  style: {},
  columns: [],
  className: '',
  summary: '',
} as TableProps;
export const Table: FunctionComponent<
  Partial<TableProps> & React.HTMLAttributes<HTMLDivElement>
> = (props) => {
  const {
    onSort,
    summary,
    noData,
    children,
    data,
    style,
    striped,
    columns,
    bordered,
  } = {
    ...defaultProps,
    ...props,
  };

  const [curData, setCurData] = useState(data);
  console.log(curData);

  useEffect(() => {
    if (data && String(data) !== String(curData)) {
      setCurData(data);
    }
  }, [data]);

  const cellClasses = (item: any) => {
    return {
      'chihuoui-table__main__head__tr--border': props.bordered,
      // [`chihuoui-table__main__head__tr--align${item.align ? item.align : ''}`]:
      //   true,
    };
  };
  const handleSortClick = (columnItem: any) => {
    if (columnItem.sorter) {
      onSort && onSort(columnItem, curData);
    }
  };
  const renderHeadCells = () => {
    return columns?.map((item, index) => {
      return (
        <span
          className={classNames(
            'chihuoui-table__main__head__tr__th',
            cellClasses(item)
          )}
          key={item.key}
          onClick={() => handleSortClick(item)}
        >
          {item.title}
          {item.sorter && ' sort'}
        </span>
      );
    });
  };
  const getColumnItem = (value: string) => {
    return columns?.filter((item) => {
      item.key === value;
    })[0];
  };
  const getColumns = () => {
    return (columns as any[]).map((column: any) => {
      return [column.key, column.render];
    });
  };
  const renderBodyTds = (item: any) => {
    console.log(item, '123');

    return getColumns().map(([value, render], index) => {
      return (
        <span
          className={classNames(
            'chihuoui-table__main__body__tr__td',
            cellClasses(getColumnItem(value))
          )}
          key={value}
        >
          {typeof item[value] === 'function' || typeof render === 'function' ? (
            <div>{render ? render(item) : item[value](item)}</div>
          ) : (
            item[value]
          )}
        </span>
      );
    });
  };
  const renderBodyTrs = () => {
    return curData?.map((item, index) => {
      return (
        <div
          className="chihuoui-table__main__body__tr"
          key={index}
        >
          {renderBodyTds(item)}
        </div>
      );
    });
  };
  return (
    <div
      className="chihuoui-table"
      style={style}
    >
      <div
        className={classNames('chihuoui-table__main', {
          'chihuoui-table__main--striped': striped,
        })}
      >
        <div className="chihuoui-table__main__head">
          <div className="chihuoui-table__main__head__tr">
            {renderHeadCells()}
          </div>
        </div>
        <div className="chihuoui-table__main__body">{renderBodyTrs()}</div>
      </div>
      {summary && (
        <div className="chihuoui-table__summary">
          <span className="chihuoui-table__summary__text">{summary}</span>
        </div>
      )}
      {(curData as object[]).length === 0 && (
        <div className="chihuoui-table__nodata">
          <div className="chihuoui-table__nodata">
            <div className="chihuoui-table__nodata__text">{noData}</div>
          </div>
        </div>
      )}
    </div>
  );
};

Table.defaultProps = defaultProps;
Table.displayName = 'ChihuouiTable';
