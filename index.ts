import * as pulumi from '@pulumi/pulumi'
import { Metallb } from './lib'

const config = new pulumi.Config()

new Metallb('metallb', {
  namespaceName: config.get('namespaceName') || 'default',
  addresses: config.require('addresses'),
})
