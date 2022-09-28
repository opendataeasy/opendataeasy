# Open Data Easy

Open Data Easy (opendataeasy) is a project for making open data app easy.

The format of this README is based on [Make a README][1].

[1]: https://www.makeareadme.com/ "Make a README"

## Changelog

[CHANGELOG](./CHANGELOG.md)

## Tech Stack

- Jest
- TypeScript
- Node.js
- MongoDB
- Docker

## Installation

Use the package manager [npm](https://pip.pypa.io/en/stable/) to install dependencies for Open Data Easy.

```sh
npm install
```

## Testing

```sh
npm test
```

## Codegen

```
❯ WORKSPACE=dataset MODULE=DataSet/DataGovTW ./bin/codegen
+ WORKSPACE=dataset
+ MODULE=DataSet/DataGovTW
++ basename DataSet/DataGovTW
+ class_name=DataGovTW
++ dirname DataSet/DataGovTW
+ src_dir=packages/dataset/src/DataSet
++ dirname DataSet/DataGovTW
+ test_dir=packages/dataset/test/DataSet
+ src=packages/dataset/src/DataSet/DataGovTW.ts
+ tests=packages/dataset/test/DataSet/DataGovTW.test.ts
+ fixture=packages/dataset/test/DataSet/DataGovTW.fixture.ts
+ mkdir -p packages/dataset/src/DataSet packages/dataset/test/DataSet
+ cat
+ cat
+ cat
+ git add packages/dataset/src/DataSet/DataGovTW.ts packages/dataset/test/DataSet/DataGovTW.test.ts packages/dataset/test/DataSet/DataGovTW.fixture.ts
+ git status -s
A  packages/dataset/src/DataSet/DataGovTW.ts
A  packages/dataset/test/DataSet/DataGovTW.fixture.ts
A  packages/dataset/test/DataSet/DataGovTW.test.ts
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[AGPL-3.0](./LICENSE)
