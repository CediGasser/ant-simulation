<script>
    import { page } from '$app/stores';
    import { SvelteUIProvider, fns, AppShell, Navbar, Header, Footer, ShellSection, Burger, Group, Button, Stack, ActionIcon, Center } from '@svelteuidev/core';
    import { GithubLogo } from 'radix-icons-svelte'

    let opened = false
</script>

<SvelteUIProvider ssr withGlobalStyles withNormalizeCSS>
    <AppShell
        override={{
            main: { 'dark-theme &': { bc: fns.themeColor('dark', 8) }, bc: fns.themeColor('gray', 0) }
        }}
        fixed
        navbarOffsetBreakpoint="sm">

        <Header slot="header" override={{ p: '$mdPX' }}>
            <Group position="apart">

                <h1>Ant Simulation</h1>

                <Group spacing="xs">
                    <Button href="/" variant={$page.url.pathname === '/' ? 'light' : 'subtle'}>Simulation</Button>
                    <Button href="/carpenterants" variant={$page.url.pathname === '/carpenterants' ? 'light' : 'subtle'}>Carpenter ants</Button>
                    <Button href="/fireants" variant={$page.url.pathname === '/fireants' ? 'light' : 'subtle'}>Fire ants</Button>
                </Group>

                <ActionIcon title="Code on Github" size="xl" radius="xl" href="https://github.com/CediGasser/ant-simulation" root="a" color="blue">
                    <GithubLogo size={32}/>
                </ActionIcon>
            </Group>
        </Header>

        <!-- Main content uses the default slot, so no need to explicitly declare it -->
        <ShellSection override={{ p: '$mdPX' }}>
            <slot />
        </ShellSection>

        <Footer slot="footer">
            <Center>
                <p>The sources of the texts written on the info pages can be found in the documentation of the following 
                <a href="https://github.com/CediGasser/ant-simulation">GitHub repository</a>.</p>
            </Center>
        </Footer>
    </AppShell>
</SvelteUIProvider>