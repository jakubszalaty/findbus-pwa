import { importSchema } from 'graphql-import'
import * as fs from 'fs'
import * as path from 'path'
import { execSync } from 'child_process'
import { getParamValue } from './helpers'

/**
 * Generate Typescript's interfaces
 * Parameters:
 * - -s - path to graphql schema or graphql document
 * - -u - url to graphql server
 * - -o - path for output file
 *
 * Usage
 * ```bash
 * ts-node ./create-types.ts
 * ts-node ./create-types.ts -u http://example.com/graphql -o './typings/schema.ts' -s './schema.graphql
 * ```
 */
async function bootstrap() {
    const schemaFile = getParamValue('-s') || './src/schema.graphql'
    const serverUrl = getParamValue('-u') || 'http://localhost:9000/graphql'
    const outputFile = getParamValue('-o') || './src/typings/schema.ts'

    const typeDefs = importSchema('./src/schema.graphql')
    const schemaFileName = 'tmp-schema.graphql'

    fs.writeFileSync(schemaFileName, typeDefs)
    const result = execSync(
        `gql-gen --url ${serverUrl} --template typescript --out ${outputFile} "./${schemaFileName}"`
    )
    fs.copyFileSync(outputFile, './app/src/schema-types.ts')
    fs.unlinkSync(schemaFileName)
}
bootstrap()
