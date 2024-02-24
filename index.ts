import childProcess from 'child_process'


function receiveStdIn(): Promise<string[]> {
    return new Promise((resolve, reject) => {
        let stdinString = ''
        process.stdin.on('data', data => stdinString += data.toString())
        process.stdin.on('close', hasError => {
            if (hasError) {
                reject(new Error("reading stdin failed"))
                return
            }

            const lines = stdinString.split(" ")
            resolve(lines)
        })
    })
}

function main() {
    const program = process.argv[2]
    receiveStdIn()
        .then(args => childProcess.execFileSync(program, args))
        .catch(error => console.error(error))
}

main()