import chroma from 'chroma-js'

export default class ThemeGenerator {
    constructor(options) {
        this.palettes = {
            'light': {
                'primary': '#3688aa',
                'secondary': '#c45249',
                'tertiary': '#303c58',
                'background': '#ffffff',
                'text': '#000000',
                'success': '#339757',
                'warning': '#fcaa32',
                'danger': '#FF0000',
                'info': '#5d5d66'
            },
            'dark': {
                'primary': '#3688aa',
                'secondary': '#c45249',
                'tertiary': '#4f6391',
                'background': '#000000',
                'text': '#ffffff',
                'success': '#339757',
                'warning': '#ee9a26',
                'danger': '#FF0000',
                'info': '#74748d'
            }
        }

        this.breakpoints = {
            xs: 0,
            sm: 600,
            md: 960,
            lg: 1280,
            xl: 1920
        }

        this.spacing = {
            sm: [2, 4, 8, 10, 12],
            md: [20, 30, 40, 50, 60],
            lg: [75, 100, 150, 200, 250]
        }

        this.shadows = [
            'none',
            '0px 1px 3px 0px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 2px 1px -1px rgba(0,0,0,0.12)',
            '0px 1px 5px 0px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 3px 1px -2px rgba(0,0,0,0.12)',
            '0px 1px 8px 0px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 3px 3px -2px rgba(0,0,0,0.12)',
            '0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)',
            '0px 3px 5px -1px rgba(0,0,0,0.2),0px 5px 8px 0px rgba(0,0,0,0.14),0px 1px 14px 0px rgba(0,0,0,0.12)',
            '0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)',
            '0px 4px 5px -2px rgba(0,0,0,0.2),0px 7px 10px 1px rgba(0,0,0,0.14),0px 2px 16px 1px rgba(0,0,0,0.12)',
            '0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)',
            '0px 5px 6px -3px rgba(0,0,0,0.2),0px 9px 12px 1px rgba(0,0,0,0.14),0px 3px 16px 2px rgba(0,0,0,0.12)',
            '0px 6px 6px -3px rgba(0,0,0,0.2),0px 10px 14px 1px rgba(0,0,0,0.14),0px 4px 18px 3px rgba(0,0,0,0.12)',
            '0px 6px 7px -4px rgba(0,0,0,0.2),0px 11px 15px 1px rgba(0,0,0,0.14),0px 4px 20px 3px rgba(0,0,0,0.12)',
            '0px 7px 8px -4px rgba(0,0,0,0.2),0px 12px 17px 2px rgba(0,0,0,0.14),0px 5px 22px 4px rgba(0,0,0,0.12)',
            '0px 7px 8px -4px rgba(0,0,0,0.2),0px 13px 19px 2px rgba(0,0,0,0.14),0px 5px 24px 4px rgba(0,0,0,0.12)',
            '0px 7px 9px -4px rgba(0,0,0,0.2),0px 14px 21px 2px rgba(0,0,0,0.14),0px 5px 26px 4px rgba(0,0,0,0.12)',
            '0px 8px 9px -5px rgba(0,0,0,0.2),0px 15px 22px 2px rgba(0,0,0,0.14),0px 6px 28px 5px rgba(0,0,0,0.12)',
            '0px 8px 10px -5px rgba(0,0,0,0.2),0px 16px 24px 2px rgba(0,0,0,0.14),0px 6px 30px 5px rgba(0,0,0,0.12)',
            '0px 8px 11px -5px rgba(0,0,0,0.2),0px 17px 26px 2px rgba(0,0,0,0.14),0px 6px 32px 5px rgba(0,0,0,0.12)',
            '0px 9px 11px -5px rgba(0,0,0,0.2),0px 18px 28px 2px rgba(0,0,0,0.14),0px 7px 34px 6px rgba(0,0,0,0.12)',
            '0px 9px 12px -6px rgba(0,0,0,0.2),0px 19px 29px 2px rgba(0,0,0,0.14),0px 7px 36px 6px rgba(0,0,0,0.12)',
            '0px 10px 13px -6px rgba(0,0,0,0.2),0px 20px 31px 3px rgba(0,0,0,0.14),0px 8px 38px 7px rgba(0,0,0,0.12)',
            '0px 10px 13px -6px rgba(0,0,0,0.2),0px 21px 33px 3px rgba(0,0,0,0.14),0px 8px 40px 7px rgba(0,0,0,0.12)',
            '0px 10px 14px -6px rgba(0,0,0,0.2),0px 22px 35px 3px rgba(0,0,0,0.14),0px 8px 42px 7px rgba(0,0,0,0.12)',
            '0px 11px 14px -7px rgba(0,0,0,0.2),0px 23px 36px 3px rgba(0,0,0,0.14),0px 9px 44px 8px rgba(0,0,0,0.12)',
            '0px 11px 15px -7px rgba(0,0,0,0.2),0px 24px 38px 3px rgba(0,0,0,0.14),0px 9px 46px 8px rgba(0,0,0,0.12)'
        ]

        this.commonPalette = {
            colorTypes: Object.keys(this.palettes.light),
            greyscale: (v) => {
                let f = chroma.scale()
                return f(v).hex()
            }
        }

        this.shades = 5

        if (options) {
            this.fromOptions(options)
        }
    }

    fromOptions(options) {
        const {
            breakpoints,
            palettes,
            spacingSmall,
            spacingMedium,
            spacingLarge,
            shadows
        } = options

        if (palettes) {
            this.addPalettes(palettes)
        }
        if (breakpoints) {
            this.setBreakpoints(breakpoints)
        }
        if (spacingSmall) {
            this.setSpacingSmall(spacingSmall)
        }
        if (spacingMedium) {
            this.setSpacingMedium(spacingMedium)
        }
        if (spacingLarge) {
            this.setSpacingLarge(spacingLarge)
        }
        if (shadows) {
            this.setShadows(shadows)
        }
    }

    setShadows (shadows) {
        this.shadows = shadows
    }

    getShadows () {
        return this.shadows
    }

    setSpacingSmall (spacing) {
        this.spacing['sm'] = spacing
    }

    setSpacingMedium (spacing) {
        this.spacing['md'] = spacing
    }

    setSpacingLarge (spacing) {
        this.spacing['lg'] = spacing
    }

    getSpacing () {
        return this.spacing
    }

    setBreakpoints (breakpoints) {
        this.breakpoints = breakpoints
    }

    getBreakpoints () {
        return this.breakpoints
    }

    generateTheme() {
        let theme = {}
        for (let themeName in this.palettes) {
            if (this.palettes.hasOwnProperty(themeName)) {
                theme[themeName] = {
                    name: themeName,
                    palette: {
                        ...this.generatePalette(this.palettes[themeName]),
                        ...this.commonPalette
                    },
                    breakpoints: this.breakpoints,
                    spacing: this.spacing,
                    shadows: this.shadows
                }
            }
        }
        return theme
    }

    getTheme(name) {
        const theme = this.generateTheme()
        if (name) {
            return theme[name]
        }
        return theme
    }

    updatePalette(name, type, color) {
        this.palettes[name][type] = color
    }

    addPalettes(palettes) {
        for (let name in palettes) {
            if (palettes.hasOwnProperty(name)) {
                // todo:: check if palette has all fields needed, if not use default color
                this.palettes[name] = palettes[name]
            }
        }
    }

    getPalette(name) {
        return this.palettes[name] || {}
    }

    getPalettes() {
        return this.palettes
    }

    generatePalette = (palette, shades = this.shades) => {
        let tmpObj = {}
        for (let type in palette) {
            if (palette.hasOwnProperty(type)) {
                const color = palette[type]
                tmpObj[type] = {
                    main: color,
                    sat: this.saturate(color, shades),
                    desat: this.desaturate(color, shades),
                    bright: this.brighten(color, shades),
                    dark: this.darken(color, shades),
                    brighten: (v) => chroma(color).brighten(v).hex(),
                    darken: (v) => chroma(color).darken(v).hex(),
                    saturate: (v) => chroma(color).darken(v).hex(),
                    desaturate: (v) => chroma(color).desaturate(v).hex()
                }
            }
        }
        return tmpObj
    }

    saturate = (color, shades = this.shades) => {
        let arr = []
        for (let i = 0; i < shades; i++) {
            arr.push(chroma(color).saturate(i).hex())
        }
        return arr
    }

    desaturate = (color, shades = this.shades) => {
        let arr = []
        for (let i = 0; i < shades; i++) {
            arr.push(chroma(color).desaturate(i).hex())
        }
        return arr
    }

    darken = (color, shades = this.shades) => {
        let arr = []
        for (let i = 0; i < shades; i++) {
            arr.push(chroma(color).darken(i).hex())
        }
        return arr
    }

    brighten = (color, shades = this.shades) => {
        let arr = []
        for (let i = 0; i < shades; i++) {
            arr.push(chroma(color).brighten(i).hex())
        }
        return arr
    }

    getShades() {
        return this.shades
    }

    setShades(n) {
        if (typeof n !== 'number' || n <= 0) {
            throw new Error('shades must be of type number > 0')
        }
        this.shades = n
    }
}
