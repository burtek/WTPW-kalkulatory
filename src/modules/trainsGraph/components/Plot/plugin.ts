import type { Plugin } from 'chart.js';

const whiteBgPlugin: Plugin<'line'> = {
    id: 'white_canvas_bg',
    beforeDraw: chart => {
        const ctx = chart.canvas.getContext('2d')!;
        ctx.save();
        ctx.globalCompositeOperation = 'destination-over';
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, chart.width, chart.height);
        ctx.restore();
    }
};

// as any - see https://github.com/reactchartjs/react-chartjs-2/issues/734
export const plugins = [whiteBgPlugin] as any;
