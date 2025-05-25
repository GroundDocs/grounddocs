export interface Config {
    apiKey?: string;
}
 
const parseArguments = (): Config => {
    const config: Config = {};
    
    // Command line arguments override environment variables
    process.argv.forEach((arg: string) => {
        const keyValuePatterns = [
            /^([A-Z_]+)=(.+)$/, // API_KEY=value format
            /^--([A-Z_]+)=(.+)$/, // --API_KEY=value format
            /^\/([A-Z_]+):(.+)$/, // /API_KEY:value format (Windows style)
            /^-([A-Z_]+)[ =](.+)$/, // -API_KEY value or -API_KEY=value format
        ];

        for (const pattern of keyValuePatterns) {
            const match = arg.match(pattern);
            if (match) {
                const [, key, value] = match;
                if (key === "API_KEY" || key === "GROUND_DOCS_API_KEY") {
                    // Strip surrounding quotes from the value
                    const cleanValue = value.replaceAll('"', "").replaceAll("'", "");
                    config.apiKey = cleanValue;
                    break;
                }
            }
        }
    });
    
    // Fallback to environment variables if not provided via command line
    if (!config.apiKey) {
        config.apiKey = process.env.GROUND_DOCS_API_KEY || process.env.API_KEY;
    }
    
    return config;
};

export const config = parseArguments();
