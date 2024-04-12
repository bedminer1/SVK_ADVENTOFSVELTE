import type { CustomThemeConfig } from "@skeletonlabs/tw-plugin";

export const myCustomTheme: CustomThemeConfig = {
  name: "my-custom-theme",
  properties: {
    // =~= Theme Properties =~=
    "--theme-font-family-base": `ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif`,
    "--theme-font-family-heading": `ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif`,
    "--theme-font-color-base": "var(--color-secondary-800)",
    "--theme-font-color-dark": "var(--color-primary-200)",
    "--theme-rounded-base": "9999px",
    "--theme-rounded-container": "8px",
    "--theme-border-base": "1px",
    // =~= Theme On-X Colors =~=
    "--on-primary": "0 0 0",
    "--on-secondary": "255 255 255",
    "--on-tertiary": "0 0 0",
    "--on-success": "var(--color-primary-200)",
    "--on-warning": "0 0 0",
    "--on-error": "255 255 255",
    "--on-surface": "255 255 255",
    // =~= Theme Colors  =~=
    // primary | #decff1
    "--color-primary-50": "250 248 253", // #faf8fd
    "--color-primary-100": "248 245 252", // #f8f5fc
    "--color-primary-200": "247 243 252", // #f7f3fc
    "--color-primary-300": "242 236 249", // #f2ecf9
    "--color-primary-400": "232 221 245", // #e8ddf5
    "--color-primary-500": "222 207 241", // #decff1
    "--color-primary-600": "200 186 217", // #c8bad9
    "--color-primary-700": "167 155 181", // #a79bb5
    "--color-primary-800": "133 124 145", // #857c91
    "--color-primary-900": "109 101 118", // #6d6576
    // secondary | #1c1c1c
    "--color-secondary-50": "221 221 221", // #dddddd
    "--color-secondary-100": "210 210 210", // #d2d2d2
    "--color-secondary-200": "198 198 198", // #c6c6c6
    "--color-secondary-300": "164 164 164", // #a4a4a4
    "--color-secondary-400": "96 96 96", // #606060
    "--color-secondary-500": "28 28 28", // #1c1c1c
    "--color-secondary-600": "25 25 25", // #191919
    "--color-secondary-700": "21 21 21", // #151515
    "--color-secondary-800": "17 17 17", // #111111
    "--color-secondary-900": "14 14 14", // #0e0e0e
    // tertiary | #b790c6
    "--color-tertiary-50": "244 238 246", // #f4eef6
    "--color-tertiary-100": "241 233 244", // #f1e9f4
    "--color-tertiary-200": "237 227 241", // #ede3f1
    "--color-tertiary-300": "226 211 232", // #e2d3e8
    "--color-tertiary-400": "205 177 215", // #cdb1d7
    "--color-tertiary-500": "183 144 198", // #b790c6
    "--color-tertiary-600": "165 130 178", // #a582b2
    "--color-tertiary-700": "137 108 149", // #896c95
    "--color-tertiary-800": "110 86 119", // #6e5677
    "--color-tertiary-900": "90 71 97", // #5a4761
    // success | #076428
    "--color-success-50": "218 232 223", // #dae8df
    "--color-success-100": "205 224 212", // #cde0d4
    "--color-success-200": "193 216 201", // #c1d8c9
    "--color-success-300": "156 193 169", // #9cc1a9
    "--color-success-400": "81 147 105", // #519369
    "--color-success-500": "7 100 40", // #076428
    "--color-success-600": "6 90 36", // #065a24
    "--color-success-700": "5 75 30", // #054b1e
    "--color-success-800": "4 60 24", // #043c18
    "--color-success-900": "3 49 20", // #033114
    // warning | #db9e1a
    "--color-warning-50": "250 240 221", // #faf0dd
    "--color-warning-100": "248 236 209", // #f8ecd1
    "--color-warning-200": "246 231 198", // #f6e7c6
    "--color-warning-300": "241 216 163", // #f1d8a3
    "--color-warning-400": "230 187 95", // #e6bb5f
    "--color-warning-500": "219 158 26", // #db9e1a
    "--color-warning-600": "197 142 23", // #c58e17
    "--color-warning-700": "164 119 20", // #a47714
    "--color-warning-800": "131 95 16", // #835f10
    "--color-warning-900": "107 77 13", // #6b4d0d
    // error | #9d0b0b
    "--color-error-50": "240 218 218", // #f0dada
    "--color-error-100": "235 206 206", // #ebcece
    "--color-error-200": "231 194 194", // #e7c2c2
    "--color-error-300": "216 157 157", // #d89d9d
    "--color-error-400": "186 84 84", // #ba5454
    "--color-error-500": "157 11 11", // #9d0b0b
    "--color-error-600": "141 10 10", // #8d0a0a
    "--color-error-700": "118 8 8", // #760808
    "--color-error-800": "94 7 7", // #5e0707
    "--color-error-900": "77 5 5", // #4d0505
    // surface | #593687
    "--color-surface-50": "230 225 237", // #e6e1ed
    "--color-surface-100": "222 215 231", // #ded7e7
    "--color-surface-200": "214 205 225", // #d6cde1
    "--color-surface-300": "189 175 207", // #bdafcf
    "--color-surface-400": "139 114 171", // #8b72ab
    "--color-surface-500": "89 54 135", // #593687
    "--color-surface-600": "80 49 122", // #50317a
    "--color-surface-700": "67 41 101", // #432965
    "--color-surface-800": "53 32 81", // #352051
    "--color-surface-900": "44 26 66", // #2c1a42
  },
};