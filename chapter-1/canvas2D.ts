export class Canvas2DUtil {
    public context: CanvasRenderingContext2D | null

    public constructor(canvas: HTMLCanvasElement) {
        this.context = canvas.getContext('2d')
    }

    public drawText(text: string) {
        if (!this.context) {
            return
        }
        this.context.save()

        this.context.textBaseline = 'middle'
        this.context.textAlign = 'center'

        const centerX: number = this.context.canvas.width / 2
        const centerY: number = this.context.canvas.height / 2

        this.context.fillStyle = 'red'
        this.context.fillText(text, centerX, centerY)

        this.context.strokeStyle = "green"
        this.context.strokeText(text, centerX, centerY)

        this.context.restore()
    }
}
