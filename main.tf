resource "azurerm_resource_group" "example" {
  name     = "devops_project_rg"
  location = "North Europe"
}

resource "azurerm_kubernetes_cluster" "aks" {
  name                = "terraform-aks"
  location            = "North Europe"
  resource_group_name = "devops_project_rg"
  dns_prefix          = "terraform-aks"

  default_node_pool {
    name       = "system"
    node_count = 2
    vm_size             = "Standard_D2s_v3"
    type                = "VirtualMachineScaleSets"
    enable_auto_scaling = false
  }

  identity {
    type = "SystemAssigned"
  }
}