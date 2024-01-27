#include <bits/stdc++.h>
using namespace std;
vector<int> solve(int A)
{
    vector<int> XJ(A, 0);
    vector<int> XE(A, 0);
    XJ[0] = 1;
    XE[0] = 1;
    int mod = 1e9 + 7;
    for (int i = 0; i < A - 1; i++)
    {
        XJ[i + 1] = (XJ[i + 1] + XJ[i]) % mod;
        if (i + 2 < A)
            XJ[i + 2] = (XJ[i + 2] + XJ[i]) % mod;
    }
    for (int i = 0; i < A - 1; i++)
    {
        int p = XJ[i];
        unordered_set<int> planets;
        for (int j = 0; j < 32; j++)
        {
            if (1 & (p >> j))
            {
                for (int l = pow(2, j); l <= pow(2, j + 1); l++)
                {
                    planets.insert(l);
                }
                p = p ^ (j >> 1);
            }
            if (p == 0)
                break;
        }
        for (int j : planets)
        {
            if (i + j < A)
                XE[i + j] = (XE[i + j] + XE[i]) % mod;
        }
    }
    return XE;
}
int main()
{
    int n;
    cin >> n;
    vector<int> XE = solve(n); // calling funtion
    for (int i : XE)
        cout << i << " ";
}