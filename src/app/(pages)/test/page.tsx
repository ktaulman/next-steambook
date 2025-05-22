'use client';
import { useRef, useState, useMemo, useEffect } from 'react'

function draw({ canvas, categories }: { canvas: HTMLCanvasElement | null, categories: any[] }) {
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (ctx === null) return;
    const { width, height } = canvas;
    const center = [Math.min(width / 2), Math.min(height / 2)]
    const [center_x, center_y] = center;
    const angle_increment = (2 * Math.PI) / (categories.length);
    const radius = Math.min(center_x * .75)
    const points = []

    for (let i = 0; i < categories.length; i++) {
        const angle_current = (i * angle_increment)
        let nextX = center_x + (radius * Math.cos(angle_current))
        let nextY = center_y + (radius * Math.sin(angle_current))
        points.push([nextX, nextY])
    }
    // console.log({ points })
    function drawCenter() {
        if (ctx === null) return;
        console.log('drawCenter() start', ctx.fillStyle)
        ctx.fillRect(center_x, center_y, 5, 5)
    }
    function drawOuterDots() {
        if (ctx === null) return;
        console.log('drawOuterDots() start', ctx.fillStyle)
        ctx.fillStyle = 'red'
        return points.forEach(el => {
            const [nextX, nextY] = el;
            ctx?.fillRect(nextX, nextY, 10, 10)
        })
    }

    function drawSpokes() {
        points.forEach((el, i) => {
            ctx.beginPath();
            ctx?.moveTo(center_x, center_y)
            const [end_x, end_y] = el;
            ctx?.lineTo(end_x, end_y)
            ctx?.stroke()

        })
    }
    function drawCategoryOptions() {
        points.forEach((el, i) => {
            const total = categories[i].options.length;
            const angle_current = (i * angle_increment)
            categories[i].options.forEach((el, i) => {

                const percentage = (1 / total) * (i + 1)
                const point_x = center_x + ((radius * percentage) * Math.cos(angle_current))
                const point_y = center_y + ((radius * percentage) * Math.sin(angle_current))
                ctx.fillStyle = 'purple'
                const option = new Path2D();
                option.arc(point_x, point_y, 5, 0, 2 * Math.PI)
                ctx?.fill(option)
                // ctx.font = '16px serif'
                // ctx?.fillText(el.title, point_x, point_y)

            })
        })
    }

    function drawCategoryLabels() {
        for (let i = 0; i < categories.length; i++) {
            const angle_current = (i * angle_increment)
            let x = center_x + ((radius * 1.1) * Math.cos(angle_current))
            let y = center_y + ((radius * 1.1) * Math.sin(angle_current))
            ctx.font = '26px serif'
            // ctx?.fillStyle='black'
            console.log(categories[i].title)
            ctx?.fillText(categories[i].title, x, y)
        }
        console.log(categories)
    }

    drawCenter();
    // drawOuterDots();
    drawSpokes();
    drawCategoryLabels();
    drawCategoryOptions();
}



function onMouseMove(e) {
    console.log(e.clientX, e.clientY)
}



export default function TestPage() {
    const canvasCategories = useRef([])

    const canvasRef = useRef(null)
    useEffect(() => {
        fetch('/template_en.json').then(data => data.json()).then(res => {
            const { categories } = res;
            draw({ canvas: canvasRef.current, categories })
        })

        // draw({ canvas: canvasRef, categories })
    }, [])


    return (
        <div className="w-full h-full *:">
            <canvas onMouseMove={onMouseMove} width={1000} height={1000} className='bg-amber-600' ref={canvasRef}></canvas>
        </div>
    );
}