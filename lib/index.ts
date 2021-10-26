import * as k8s from '@pulumi/kubernetes'
import * as pulumi from '@pulumi/pulumi'

export interface MetallbArgs {
  namespaceName: pulumi.Input<string>
  addresses: pulumi.Input<string>
}

export class Metallb extends pulumi.ComponentResource {
  public readonly chart: k8s.helm.v3.Chart

  constructor(
    name: string,
    args: MetallbArgs,
    opts?: pulumi.ComponentResourceOptions,
  ) {
    super('vizv:module:Metallb', name, {}, opts)

    this.chart = new k8s.helm.v3.Chart(
      name,
      {
        chart: 'metallb',
        fetchOpts: {
          repo: 'https://vizv-pulumi.github.io/helm-charts',
        },
        namespace: args.namespaceName,
        values: {
          configInline: {
            'address-pools': [
              {
                name: 'default',
                protocol: 'layer2',
                addresses: [args.addresses],
              },
            ],
          },
        },
      },
      {
        parent: this,
        protect: opts?.protect,
        dependsOn: opts?.dependsOn,
      },
    )
  }
}
