"use client";

import { Treemap, ResponsiveContainer } from "recharts";

interface TechItem {
  name: string;
  value: number;
}

interface CategoryGroup {
  name: string;
  children: TechItem[];
}

interface TechStackTreemapProps {
  data: CategoryGroup[];
  height?: number;
  showLegend?: boolean;
}

const CATEGORY_COLORS: Record<string, string> = {
  '프론트엔드': '#3b82f6',      // blue
  '백엔드': '#10b981',          // green
  '데이터베이스': '#8b5cf6',    // purple
  '클라우드/인프라': '#f59e0b',  // amber
  '모바일': '#ec4899',          // pink
  '데이터/AI': '#06b6d4',       // cyan
  '기타': '#6b7280'             // gray
};

const CustomTreemapContent = (props: any) => {
  const { x, y, width, height, depth, name, value, root } = props;

  // depth 0 = 카테고리, depth 1 = 개별 기술
  const isCategory = depth === 1;

  // 폰트 크기 조정
  const baseFontSize = isCategory
    ? Math.max(12, Math.min(width / 8, height / 6, 16))
    : Math.max(8, Math.min(width / 10, height / 4, 12));

  const baseColor = CATEGORY_COLORS[isCategory ? name : root?.name] || CATEGORY_COLORS['기타'];

  // 텍스트 줄바꿈 처리
  const truncateText = (text: string, maxWidth: number, fontSize: number) => {
    const avgCharWidth = fontSize * 0.6;
    const maxChars = Math.floor(maxWidth / avgCharWidth);
    if (text.length > maxChars && maxChars > 3) {
      return text.slice(0, maxChars - 2) + '..';
    }
    return text;
  };

  const displayName = truncateText(name || '', width - 8, baseFontSize);

  // 카테고리는 배경색만 표시 (반투명)
  if (isCategory) {
    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          style={{
            fill: baseColor,
            stroke: '#fff',
            strokeWidth: 3,
            opacity: 0.3,
          }}
        />
        {width > 60 && height > 30 && (
          <text
            x={x + width / 2}
            y={y + 20}
            textAnchor="middle"
            fill={baseColor}
            fontSize={baseFontSize}
            fontWeight="600"
          >
            {displayName}
          </text>
        )}
      </g>
    );
  }

  // 개별 기술 표시
  const shouldShowValue = width > 40 && height > 30;

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        style={{
          fill: baseColor,
          stroke: '#fff',
          strokeWidth: 2,
        }}
      />
      {width > 25 && height > 20 && (
        <>
          <text
            x={x + width / 2}
            y={y + height / 2 + (shouldShowValue ? -baseFontSize / 3 : baseFontSize / 4)}
            textAnchor="middle"
            fill="#fff"
            fontSize={baseFontSize}
            fontWeight="normal"
          >
            {displayName}
          </text>
          {shouldShowValue && (
            <text
              x={x + width / 2}
              y={y + height / 2 + baseFontSize}
              textAnchor="middle"
              fill="#fff"
              fontSize={baseFontSize * 0.75}
              opacity={0.9}
            >
              {value}
            </text>
          )}
        </>
      )}
    </g>
  );
};

export function TechStackTreemap({ data, height = 400, showLegend = true }: TechStackTreemapProps) {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-muted-foreground">
        데이터가 없습니다
      </div>
    );
  }

  return (
    <div>
      {showLegend && (
        <div className="flex flex-wrap gap-3 mb-4">
          {Object.entries(CATEGORY_COLORS).map(([category, color]) => (
            <div key={category} className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded"
                style={{ backgroundColor: color }}
              />
              <span className="text-sm text-muted-foreground">{category}</span>
            </div>
          ))}
        </div>
      )}

      <ResponsiveContainer width="100%" height={height}>
        <Treemap
          data={data}
          dataKey="value"
          stroke="#fff"
          fill="#8884d8"
          content={<CustomTreemapContent />}
        />
      </ResponsiveContainer>
    </div>
  );
}
