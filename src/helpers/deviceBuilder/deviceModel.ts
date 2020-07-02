import * as Utils from '../utils';

// type CapabilityType = 'Telemetry' | 'Property' | 'Command';

type SchemaTypes = 'double' | 'integer' | 'string' | 'geopoint' | 'dateTime';
// type CapabilityType = 'Telemetry' | 'Property' | 'Command';
export enum CapabilityType {
    Property = 'Property',
    Telemetry = 'Telemetry',
}
export enum SemanticType {
    None = 'None',
    Event = 'Event',
}
export default class ModelBuilder {
    private Model = {
        displayName: '',
        name: '',
    };

    private Dcm = {
        displayName: '',
        name: '',
        ref: '',
        Interface: {
            ref: '',
            name: '',
        },
        model: {},
    };

    private Dsm = {
        displayName: '',
        name: '',
        model: {},
    };

    constructor(
        modelDisplayName: string,
        deviceCapabilityModelDisplayName: string
    ) {
        this.Model.displayName = modelDisplayName;
        this.Model.name = Utils.toCamelCaseString(modelDisplayName);

        this.Dcm.displayName = deviceCapabilityModelDisplayName;
        this.Dcm.name = `${Utils.toCamelCaseString(
            deviceCapabilityModelDisplayName
        )}_${Utils.getGuid()}`;
        this.Dcm.ref = `urn:${this.Model.name}:${this.Dcm.name}`;
        this.Dcm.Interface.name = `${Utils.toCamelCaseString(
            deviceCapabilityModelDisplayName
        )}_${Utils.getGuid()}`;
        this.Dcm.Interface.ref = `urn:${this.Model.name}:${this.Dcm.Interface.name}`;

        this.Dcm.model = {
            '@id': `${this.Dcm.ref}:1`,
            '@type': ['CapabilityModel'],
            implements: [
                {
                    '@id': `${this.Dcm.ref}:${Utils.getGuid(6)}:1`,
                    '@type': ['InterfaceInstance'],
                    name: this.Dcm.Interface.name,
                    schema: {
                        '@id': `${this.Dcm.Interface.ref}:1`,
                        '@type': ['Interface'],
                        contents: [],
                    },
                },
            ],
            contents: [],
        };

        this.Dsm.displayName = `${this.Model.displayName}DSM`;
        this.Dsm.name = Utils.toCamelCaseString(this.Dsm.displayName);
        this.Dsm.model = {
            '@id': `urn:${this.Model.name}:${this.Dsm.name}:1`,
            '@type': ['SolutionModel'],
            cloudProperties: [],
            initialValues: [],
            overrides: [],
        };
    }

    public getModel() {
        return {
            types: ['DeviceModel'],
            displayName: this.Model.displayName,
            capabilityModel: this.Dcm.model,
            solutionModel: this.Dsm.model,
        };
    }

    public addTelemetryCapability(
        displayName: string,
        options?: {
            schema?: SchemaTypes;
        }
    ) {
        const name = Utils.toCamelCaseString(displayName);
        const capability = {
            '@id': `${this.Dcm.Interface.ref}:${name}:1`,
            '@type': ['Telemetry'],
            displayName,
            name,
            ...options,
        };
        this.Dcm.model['implements'][0].schema.contents.push(capability);
    }

    public aadCapability(
        displayName: string,
        capabilityType: CapabilityType.Property,
        semanticType: SemanticType.None,
        options: {
            schema: PropertySchemas;
        }
    ): void;
    public aadCapability(
        displayName: string,
        capabilityType: CapabilityType.Telemetry,
        semanticType: SemanticType.None,
        options: {
            schema: TelemetrySchemas;
        }
    ): void;
    public aadCapability(
        displayName: string,
        capabilityType: CapabilityType,
        semanticType: any,
        options: any
    ): any {
        const type =
            semanticType === SemanticType.None
                ? [capabilityType]
                : [capabilityType, `SemanticType/${semanticType}`];
        const name = Utils.toCamelCaseString(displayName);
        const capability = {
            '@id': `${this.Dcm.Interface.ref}:${name}:1`,
            '@type': type,
            displayName,
            name,
            ...options,
        };
        this.Dcm.model['implements'][0].schema.contents.push(capability);
    }
}

export type PropertySchemas = 'string';
export type TelemetrySchemas = 'double';
